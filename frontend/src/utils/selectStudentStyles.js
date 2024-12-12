export const selectStudentStyles = {
    dropdownIndicator: (styles) => ({
        ...styles,
        color:`var(--blue-2)`
    }),
    clearIndicator: (styles) => ({
        ...styles,
        color: `var(--blue-2)`
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: `var(--blue-2)`
    }),
    menuList: (styles) => ({
        ...styles,
        backgroundColor: `var(--blue-1)`
    }),
    multiValue: (styles) => ({
        ...styles,
        backgroundColor: `var(--blue-2)`,
        borderRadius:"10px",
        color:'black'
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color:'black'
    }),
    placeholder: (styles) => ({
        ...styles, 
        color:"black"
    }),
    control: (styles) => ({
        ...styles, 
        backgroundColor: `var(--blue-1)`, 
        borderRadius:"10px", 
        border:"1px solid var(--blue-5)",
        minWidth:"100px",
        maxWidth:"500px"
    }),
    option: (styles) => ({
        ...styles, 
        backgroundColor: `var(--blue-1)`,
        color: `black`,
        "&:hover": {
            backgroundColor: `var(--blue-2)`
        }
    }),
    input: (styles) => ({
        ...styles,
        color:`black`
    })
}