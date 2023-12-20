import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fffff',
  boxShadow: 24,
  p: 4
}
type Prop = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
export default function RegisterModal(prop: Prop) {
  const message = useSelector((state: RootState) => state.usersR.message)
  console.log('🚀 ~ file: RegisterModal.tsx:27 ~ RegisterModal ~ message:', message)
  // Use useEffect to automatically open the modal when there's a message
  useEffect(() => {
    if (message) {
      prop.handleOpen()
    }
  }, [message])
  return (
    <div>
      <Modal
        open={prop.open}
        onClose={prop.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hello there,
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message ? message.msg : ''}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
