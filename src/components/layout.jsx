import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";

function Layout() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div style={{ marginTop: "120px" }}>
        <Outlet />
      </div>
      <footer>
        <div class="container">
          <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
              <li class="nav-item">
              <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                  class="nav-link px-2 text-muted"
                >
                  Accueil
                </p>
              </li>
              <li class="nav-item">
              <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Formation");
                  }}
                  class="nav-link px-2 text-muted"
                >
                  Formation
                </p>
              </li>
              <li class="nav-item">
              <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Formateur");
                  }}
                  class="nav-link px-2 text-muted"
                >
                 Formateur
                </p>
              </li>
              <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Apprenant");
                  }}
                  class="nav-link px-2 text-muted"
                >
                  Apprenant
                </p>
              <li class="nav-item">
                <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Groupes");
                  }}
                  class="nav-link px-2 text-muted"
                >
                  Groupes
                </p>
              </li>
              <p
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Promotion");
                  }}
                  class="nav-link px-2 text-muted"
                >
                  Promotion
                </p>
            </ul>
            <p class="text-center text-muted">&copy; 2024 Emane Daniel Akim</p>
          </footer>
        </div>
      </footer>
    </>
  );
}

export default Layout;
