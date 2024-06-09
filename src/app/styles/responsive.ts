import {css} from 'styled-components'
type PropTypes={
    [key:string]:number|string
}

export const Medium = (props:PropTypes)=>{
     return  css `
      @media screen and (max-width:1280px){
         ${props}
      }
     `
}

export const TabVertical = (props:PropTypes)=>{
    return  css `
     @media screen and (max-width:1199px){
        ${props}
     }
    `
}

export const Tablet = (props:PropTypes)=>{
    return  css `
     @media screen and (max-width:992px){
        ${props}
     }
    `
}

export const Andriod = (props:PropTypes)=>{
    return  css `
     @media screen and (max-width:767px){
        ${props}
     }
    `
}

export const Windows = (props:PropTypes)=>{
    return  css `
     @media screen and (max-width:450px){
        ${props}
     }
    `
}

export const Ios = (props:PropTypes)=>{
    return  css `
     @media screen and (max-width:340px){
        ${props}
     }
    `
}

export const LG = (props:PropTypes)=>{
    return  css `
     @media screen and (min-width:1600px){
        ${props}
     }
    `
}