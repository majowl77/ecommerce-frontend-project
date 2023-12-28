import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import { style } from '../../utils/constants'

type Prop = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
export default function RegisterModal(prop: Prop) {
  const message = useSelector((state: RootState) => state.usersR.message)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (message) {
      prop.handleOpen()
    }
    let timer: NodeJS.Timeout

    if (prop.open) {
      // Start the countdown when the modal opens
      timer = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0))
      }, 1000)
    }

    return () => {
      // Clear the timer when the modal closes
      clearInterval(timer)
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
          <div className="checkMark">
            <Typography>
              <img
                src="https://media.tenor.com/1Z_CN1hhaAYAAAAi/check-mark-good.gif"
                width="200px"
                height="200px"
              />
            </Typography>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hello there,
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message && typeof message === 'string' ? message : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {countdown > 0
              ? `Redirecting to the home page in ${countdown} seconds`
              : 'Auto-closing...'}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
