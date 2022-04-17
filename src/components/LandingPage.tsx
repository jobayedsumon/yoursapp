import { useState } from "react";

const LandingPage = () => {
  const [formState, setformState] = useState({
    owner_name: "",
    repository_name: "",
  });
  const [errors, setErrors] = useState({
    owner_name: "",
    repository_name: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      setformState({
        ...formState,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "This field is required",
      });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formState.owner_name && formState.repository_name) {
      console.log("submitted: ", formState);
    } else {
      setErrors({
        ...errors,
        owner_name: !formState.owner_name ? "This field is required" : "",
        repository_name: !formState.repository_name
          ? "This field is required"
          : "",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <img className="pt-4" src="logo.png" alt="" />
        </div>
      </div>
      <form
        className="form row h-75 d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="col-md-7">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>
                  Owner <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Owner name"
                  name="owner_name"
                  onChange={handleChange}
                  style={errors.owner_name ? { border: "1px solid red" } : {}}
                />
                {formState.owner_name !== "" && !errors.owner_name && (
                  <i
                    className="fa fa-check text-success"
                    aria-hidden="true"
                  ></i>
                )}

                {errors.owner_name && (
                  <span className="error-msg arrow_box">
                    {errors.owner_name}
                  </span>
                )}
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>
                  Repository <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Repository name"
                  name="repository_name"
                  onChange={handleChange}
                  style={
                    errors.repository_name ? { border: "1px solid red" } : {}
                  }
                />
                {formState.repository_name !== "" &&
                  !errors.repository_name && (
                    <i
                      className="fa fa-check text-success"
                      aria-hidden="true"
                    ></i>
                  )}

                {errors.repository_name && (
                  <span className="error-msg arrow_box">
                    {errors.repository_name}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group text-center mt-5">
              <button type="submit" className="btn btn-custom">
                Show issues
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
