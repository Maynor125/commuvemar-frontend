import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';


export const PathsSideBar = [
    {
        id:1,
        name:'Over view',
        path:'/admin',
        icon:HomeOutlinedIcon,
    },
    {
        id:2,
        name:'Info fichas',
        path:'/admin/infoFichas',
        icon:BookOutlinedIcon,
    },
    {
        id:3,
        name:'History fichas',
        path:'/admin/historyFichas',
        icon:HistoryOutlinedIcon,
    },
    {
        id:4,
        name:'Analytics',
        path:'/admin/reports',
        icon:BarChartOutlinedIcon
    },
    {
        id:5,
        name:'Workers',
        path:'/admin/workers',
        icon:EngineeringOutlinedIcon,
    },
    {
        id:6,
        name:'Fincas',
        path:'/admin/fincas',
        icon:AgricultureOutlinedIcon,
    },
    {
        id:7,
        name:'Productors',
        path:'/admin/productors',
        icon:StarBorderRoundedIcon,
    },
    {
        id:8,
        name:'Users',
        path:'/admin/users',
        icon:PermIdentityOutlinedIcon,
    }
]