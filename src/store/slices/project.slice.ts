import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs  } from 'firebase/firestore'; 
import { projectInterface } from '@/interfaces/project.interface';
import { projectItemProps } from '@/interfaces/projectItem.interface';
import { CollectionReference, DocumentData } from 'firebase/firestore';

const initialState : projectInterface = {
    projectList: [],
    projectListError: undefined,
    loader: false
};

type LoadDataParams = {
    messageRef: CollectionReference<DocumentData>,
    typeOfList: string,
    projectId: string | undefined
};

export const loadData = createAsyncThunk<
{ 
    data: DocumentData[], 
    targetField: string, 
    projectId: string | undefined 
}, LoadDataParams>(
    'projectData',
    async (params) => {
        const list = await getDocs(params.messageRef);
        const dataRef = list.docs.map((item) => item.data());
        return {
            data: dataRef,
            targetField: params.typeOfList,
            projectId: params.projectId
        };
    }
)

export const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        clearProjectListError: (state) => {
            state.projectListError = undefined;
        },

        clearLoader: (state) => {
            state.loader = false;
        }
    },
    extraReducers(builder) {
            builder.addCase(loadData.fulfilled, (state, action) => {
                if(action.payload.targetField === 'columns') {
                    state.projectList = state.projectList.map(item => {
                        if(item.id === action.payload.projectId) {
                            return {
                                ...item,
                                [action.payload.targetField]: action.payload.data
                            }
                        }
                        return item;
                    })
                } else {
                    state.projectList = action.payload.data as projectItemProps[];
                }
        });
        builder.addCase(loadData.rejected, (state, action) => {
            state.projectListError = action.error.message;
        });
        builder.addCase(loadData.pending, (state) => {
            state.loader = true;
        });
    }
});

export const { clearProjectListError, clearLoader } = projectSlice.actions;
export default projectSlice.reducer;
