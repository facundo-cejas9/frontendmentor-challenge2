import { useState, FormEvent, ChangeEvent } from "react";

const App = () => {


  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    queryType: '',
    checkbox: '',
    message: ''
  })

  const [error, setError] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    // Verifica si el email contiene un "@".
    return email.includes('@');
  };

  const validate = () => {
    let formErrors: { [key: string]: string } = {};
    if (!formData.firstname) formErrors.firstname = 'First Name is required';
    if (!formData.lastname) formErrors.lastname = 'Last Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.queryType) formErrors.queryType = 'Query Type is required';
    if (!formData.message) formErrors.message = 'Message is required';
    if (!formData.checkbox) formErrors.checkbox = 'To submit this form, please consent to being contacted.';
    return formErrors;
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
     ...formData,
      [name]: value
    })
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación de email
    let formErrors: { [key: string]: string } = {};
    if (!validateEmail(formData.email)) {
      formErrors.email = 'Enter a valid email address';
    }

    // Validación de otros campos
    if (!formData.firstname) formErrors.firstname = 'First Name is required';
    if (!formData.lastname) formErrors.lastname = 'Last Name is required';
    if (!formData.queryType) formErrors.queryType = 'Query Type is required';
    if (!formData.message) formErrors.message = 'Message is required';

    if (Object.keys(formErrors).length === 0) {
      // Enviar el formulario
      console.log('Form submitted:', formData);
    } else {
      setError(formErrors);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        
        <form className="form" onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
          <div className="form-group">
            <div className="doble-inputs">
              <label className={ 'required-label' } htmlFor="firstName">First Name</label>
              <input className={error.firstname ? 'input-error' : 'input-form'} value={formData.firstname} onChange={handleChange}  type="text" id="firstname" name="firstname" />
              {error.firstname && <span className="error">{error.firstname}</span>}
            </div>

            <div className="doble-inputs">
              <label className={ 'required-label' } htmlFor="lastname">
                Last Name
              </label>
              <input className={error.firstname ? 'input-error' : 'input-form'} value={formData.lastname} onChange={handleChange} type="text" id="lastname" name="lastname" />
              {error.lastname && <span className="error">{error.lastname}</span>}
            </div>
        
          </div>

          <div className="form-group1">
            <label className={ 'required-label' } htmlFor="email">Email</label>
            <input className={error.email ? 'input-error' : 'input-form'} value={formData.email} onChange={handleChange}  type="text" id="email" name="email" />
            {error.email && <span className="error">{error.email}</span>}
          </div>

          <div className="radio-container">
          <label  className="required-label">Query Type</label>
            <div className="form-group-radio">
             
              <div className="doble-inputs-radio">
                <input
                  className={error.queryType ? 'input-error' : 'input-form'}
                  type="radio"
                  id="queryType1"
                  name="queryType"
                  value="General Enquiry"
                  onChange={handleChange}
                />
                <label htmlFor="queryType1">General Enquiry</label>
              </div>

              <div className="doble-inputs-radio">
                <input
                  className={error.queryType ? 'input-error' : 'input-form'}
                  type="radio"
                  id="queryType2"
                  name="queryType"
                  value="Support Request"
                  onChange={handleChange}
                />
                <label htmlFor="queryType2">Support Request</label>
                
              </div>
              
            </div>
            {error.queryType && <span className="error">{error.queryType}</span>}
          </div>

          <div className="form-group1">
            <label className="required-label" htmlFor="firstName">Message</label>
            <textarea  className={error.message ? 'textarea-error' : 'textarea-form'} value={formData.message} onChange={handleChange}  id="firstName" name="message" />
            {error.message && <span className="error">{error.message}</span>}
          </div>

          <div className="checkbox">
            <input type="checkbox" />
            <p>I consent to being contacted by team</p>

          </div>
          {error.checkbox && <span className="error">{error.checkbox}</span>}

          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
