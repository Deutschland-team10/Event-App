import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

import ListItemButton from '@mui/material/ListItemButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListItemText } from '@mui/material';


const links = [
  {
    title: "Dashboard",
    url: "/home",
    //icons: <InboxIcon />
  },
  {
    title: "About",
    url: "/home/about"
  },
  {
    title: "Group",
    url: "/home/group"
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
    <List>
      {links.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton
            onClick={() => navigate(item.url)}
            // sx={{
            //   backgroundColor: item.url === location.pathname ? 'rgba(255,255,255,0.1)' 
            //   : 'transparent',
            //   color: 'white',
            //   '&:hover': {
            //     backgroundColor: 'rgba(255,255,255,0.2)'
            //   }
            // }}
          >
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default MenüListItem