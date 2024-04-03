import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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
        name:'Analysis Fichas',
        path:'/admin/analysisFichas',
        icon:BarChartOutlinedIcon
    },
    {
        id:5,
        name:'Reports',
        path:'/admin/reports',
        icon:QueryStatsOutlinedIcon
    },
    {
        id:6,
        name:'Workers',
        path:'/admin/workers',
        icon:EngineeringOutlinedIcon,
    },
    {
        id:7,
        name:'Fincas',
        path:'/admin/fincas',
        icon:AgricultureOutlinedIcon,
    },
    {
        id:8,
        name:'Productors',
        path:'/admin/productors',
        icon:StarBorderRoundedIcon,
    },
    {
        id:9,
        name:'Users',
        path:'/admin/users',
        icon:PermIdentityOutlinedIcon,
    }
]