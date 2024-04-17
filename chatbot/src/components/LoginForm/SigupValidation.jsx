import rect from 'rect'

function validation(values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#.$%^&*()_+{}\[\]:;<>,.?~\\/-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;

    
    if(values.fname === "")
    {
        error.fname = "FirstName Should not be empty"
    }
    else{
        error.fname = ""
    }

    if(values.lname === "")
    {
        error.lname = "LastName Should not be empty"
    }
    else{
        error.lname = ""
    }


    if(values.email === "")
    {
        error.email = "Email Should not be empty"
    }
    else if(!email_pattern.test(values.email))
    {
        error.email = "Email Didn't match"
    }else{
        error.email = ""
    }

    if(values.password === "")
    {
        error.password = "Password Should not be empty"
    }
    else if(!password_pattern.test(values.password))
    {
        error.password = "Password Didn't match"
    }else{
        error.password = ""
    }
    return error;
}
export default validation;