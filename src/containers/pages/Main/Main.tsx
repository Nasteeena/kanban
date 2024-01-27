import {Box, Typography, Skeleton } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { MAIN } from '@/utils/constants';
import ProjectList from '@/components/ProjectList/ProjectList';
import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import headerImage from '../../../assets/header.png';
import { ChangeEvent } from 'react';
import { projectItemProps } from '@/interfaces/projectItem.interface';
import useProjectList from '@/hooks/useProjectList';

const Main = () => {
    const { id } = useAuth();
    const [inputValue, setInputValue] = useState<string>('');
    const { projectList, loader } = useProjectList();
    const [projects, setProjects] = useState<projectItemProps[]>([]);
    const { displayName, email } = useAuth();
    const displayUser = displayName ? displayName : email;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (inputValue.trim().length) {
            const res = projectList.filter((item: projectItemProps) => item.title.toLowerCase().includes(inputValue.toLowerCase()));
            setProjects(res);
        } else {
            setProjects(projectList);
        }
    }, [inputValue, projectList]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    return (
        <Box sx={{ height: '100vh'}}>
            <Header 
                inputValue={inputValue} 
                handleChange={handleChange}
                userName={displayUser}
            />
            <Box sx={{
                backgroundColor: '#ffcc40', 
                width: '90%', 
                p: '6px 30px', 
                m: '0 auto', 
                borderRadius: '20px', 
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)', 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start'
                    }}>
                    <Typography>
                        Hi, {displayUser}
                    </Typography>
                    {
                        loader 
                        ? <Skeleton variant="rectangular" width={500} height={20}/>
                        : projectList.length 
                        ?   <Typography>
                                You have {projectList.length} {projectList.length > 1 ? 'projects' : 'project'} to do
                            </Typography>
                        : 'You don`t have any projects yet. Add a new one to start working'
                    }
                </Box>
                <Box
                    component="img"
                    src={headerImage}
                    alt='Header Image'
                    sx={{height: '85px'}}
                >
                </Box>
            </Box>
            <Typography variant='subtitle1'  sx={{m: '1em 1.8em', fontSize: '1.3rem'}}>
                {MAIN.SUB_HEADER}
            </Typography>
            <Box
            >
                <ProjectList 
                    projectList={projects}
                    id={id}
                    appearance='main'
                    loading={loader}
                />
            </Box>
        </Box>
    );
};

export default Main;
