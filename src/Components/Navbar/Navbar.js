import { useState } from "react";
import { Link } from 'react-router-dom'

function Navbar() {
  const [show, setShow] = useState(false)
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <Link class="navbar-brand yellow-text" to="/"><strong>&#9733;</strong> SP</Link>
          <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)}>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class={`collapse navbar-collapse ${show ? "show" : "" }`} id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
              <li class="nav-item ">
                <Link class="nav-link white-text" aria-current="page" to="/">Home</Link>
              </li>
              {/* <li class="nav-item">
                <Link class="nav-link white-text" to="/myprojects">My Project</Link>
              </li> */}
              <li class="nav-item">
                <Link class="nav-link white-text" to="/contact">Contact Me</Link>
              </li>
              <li>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
