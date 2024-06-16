import { useState, FormEvent, ChangeEvent } from "react";

const App = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    queryType: "",
    checkbox: false,
    message: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState(false)

  const validateEmail = (email: string) => {
    // Verifica si el email contiene un "@".
    return email.includes("@");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification(true)
    // Validación de email
    let formErrors: { [key: string]: string } = {};
    if (!validateEmail(formData.email)) {
      formErrors.email = "Enter a valid email address";
    }

    // Validación de otros campos
    if (!formData.firstname) formErrors.firstname = "First Name is required";
    if (!formData.lastname) formErrors.lastname = "Last Name is required";
    if (!formData.queryType) formErrors.queryType = "Query Type is required";
    if (!formData.message) formErrors.message = "Message is required";
    if (!formData.checkbox)
      formErrors.checkbox =
        "To submit this form, please consent to being contacted.";

    if (Object.keys(formErrors).length === 0) {
      // Enviar el formulario
      setFormData(initialState);

      setError({});
    } else {
      setError(formErrors);
      setNotification(false)
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <div className="form-group">
            <div className="doble-inputs">
              <label className={"required-label"} htmlFor="firstName">
                First Name
              </label>
              <input
                className={error.firstname ? "input-error" : "input-form"}
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                id="firstname"
                name="firstname"
              />
              {error.firstname && (
                <span className="error">{error.firstname}</span>
              )}
            </div>

            <div className="doble-inputs">
              <label className={"required-label"} htmlFor="lastname">
                Last Name
              </label>
              <input
                className={error.firstname ? "input-error" : "input-form"}
                value={formData.lastname}
                onChange={handleChange}
                type="text"
                id="lastname"
                name="lastname"
              />
              {error.lastname && (
                <span className="error">{error.lastname}</span>
              )}
            </div>
          </div>

          <div className="form-group1">
            <label className={"required-label"} htmlFor="email">
              Email
            </label>
            <input
              className={error.email ? "input-error" : "input-form"}
              value={formData.email}
              onChange={handleChange}
              type="text"
              id="email"
              name="email"
            />
            {error.email && <span className="error">{error.email}</span>}
          </div>

          <div className="radio-container">
            <label className="required-label">Query Type</label>
            <div className="form-group-radio">
              <div className={ formData.queryType === "General Enquiry" ? 'checked' : 'doble-inputs-radio' }>
                <input
                  className={error.queryType ? "input-error" : "input-radio"}
                  type="radio"
                  id="queryType1"
                  name="queryType"
                  value="General Enquiry"
                  onChange={handleChange}
                  checked={formData.queryType === "General Enquiry"}
                />
                <label htmlFor="queryType1">General Enquiry</label>
              </div>

              <div className={ formData.queryType === "Support Request" ? 'checked' : 'doble-inputs-radio' }>
                <input
                  className={error.queryType ? "input-error" : "input-radio"}
                  type="radio"
                  id="queryType2"
                  name="queryType"
                  value="Support Request"
                  checked={formData.queryType === "Support Request"}
                  onChange={handleChange}
                />
                <label htmlFor="queryType2">Support Request</label>
              </div>
            </div>
            {error.queryType && (
              <span className="error">{error.queryType}</span>
            )}
          </div>

          <div className="form-group1">
            <label className="required-label" htmlFor="firstName">
              Message
            </label>
            <textarea
              className={error.message ? "textarea-error" : "textarea-form"}
              value={formData.message}
              onChange={handleChange}
              id="firstName"
              name="message"
            />
            {error.message && <span className="error">{error.message}</span>}
          </div>

          <div className="check-container">
            <div className="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={formData.checkbox}
                onChange={handleChange}
              />
              <label htmlFor="checkbox">
                I consent to being contacted by team
              </label>
            </div>
            {error.checkbox && <span className="error">{error.checkbox}</span>}
          </div>

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {
        notification && (
          <div className="notification-container">
            <div className="notification">
              <div className="notification-title">
                <img src="./assets/icon-success-check.svg" alt="success icon" />
              <h3>Message Sent!</h3>
              </div>
              
              <p>Thanks you for completing the form. We'll be in touch soon!</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default App;
