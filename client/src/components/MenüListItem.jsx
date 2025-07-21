import { Dialog, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const icon = (name) => `p`
const links = [
  {
    title: "Dashobard",
    url: "/home"
  },
  {
    title: "About",
    url: "/home/about"
  },
  {
    title: "Create Event",
    url: "/home/create-event",
  }
]

const MenüListItem = () => {
  const navigate = useNavigate()
  const location = useLocation()





  return (
    <div>
      <List>
        <Toolbar />
        {links.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.url)}
              sx={{
                backgroundColor: item.url === location.pathname ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              {/* <ListItemIcon sx={{ color: 'white' }}>
            {index %2===0?<HomeIcon/>: <InfoIcon /> }
          </ListItemIcon> */}
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default MenüListItem