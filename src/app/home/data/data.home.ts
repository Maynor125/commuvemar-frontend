export const Links_home = {
    HOME:{
        path: '#home',
        name: "Home"
    },
    ABOUT:{
        
        path: '#about',
        name: "About"
    },
    SERVICE:{
        name: "Services",
        path: '#services'
    },
    CONTACT:{
        name: "Contact",
        path: '#contact'
    }
}

export interface Link_home{
    path: string,
    name: string,
}


export const Services = [
    {
        id:1,
        icon: require('../../../../public/images/home/cards/1.png'),
        title:'Venta de cacao',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
        id:2,
        icon: require('../../../../public/images/home/cards/2.png'),
        title:'Compra de cacao',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
        id:3,
        icon: require('../../../../public/images/home/cards/3.png'),
        title:'Procesamiento',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
        id:4,
        icon: require('../../../../public/images/home/cards/4.png'),
        title:'Inspecciones',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
        id:5,
        icon: require('../../../../public/images/home/cards/5.png'),
        title:'Acopio de cacao',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
    {
        id:6,
        icon: require('../../../../public/images/home/cards/6.png'),
        title:'Asistencia tecnica',
        text:'Choose your doctor from thousands of specialist, general, and trusted hospitals'
    },
]