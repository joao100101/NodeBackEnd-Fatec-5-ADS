import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ConfirmDialog from './ConfirmDialog'
const UserMenu = ({ user }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const confirmLogout = (event) => {
        setOpenDialog(true);
        handleClose(event)
    }

    const handleDialogClose = (answer) => {
        setOpenDialog(false);
        if (answer) navigate('/logout');
    }

    return (
        <>
            {
                user ?
                    <>
                        <ConfirmDialog
                            title="Atenção"
                            open={openDialog}
                            onClose={handleDialogClose}
                        >
                            Deseja realmente sair?
                        </ConfirmDialog>
                        <Button
                            variant='text'
                            color='secondary'
                            startIcon={<PersonIcon />}
                            onClick={handleClick}
                        >
                            {user?.first_name + ' ' + user?.last_name}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button'
                            }}
                        >
                            <MenuItem onClick={confirmLogout}>
                                Sair
                            </MenuItem>

                        </Menu>
                    </>
                    :
                    <>
                        <Button
                            variant='text'
                            color='secondary'
                            component={Link}
                            to="/login"
                            startIcon={<LoginIcon />}
                        >
                            Entrar
                        </Button>
                    </>
            }
        </>
    )
}

export default UserMenu