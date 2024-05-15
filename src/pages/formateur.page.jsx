import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import { Button, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormateurPage() {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const formateurPerPage = 5; //

  // Index du dernier apprenant de la page
  const indexOfLastFormateur = currentPage * formateurPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstFormateur = indexOfLastFormateur - formateurPerPage;
  // Apprenants de la page actuelle
  const currentFormateur = formateurs.slice(
    indexOfFirstFormateur,
    indexOfLastFormateur
  );

  useEffect(() => {
    document.title = "Formateurs";

    axios
      .get("http://localhost:8000/formateur")
      .then((response) => {
        setFormateurs(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [reload]);
  if (loading) {
    return <Loading />;
  }

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h2 className="text-center w-100 mb-5">Liste des formateurs</h2>
      <div className="my-3">
        <Button
          variant="success"
          onClick={() => {
            navigate("/addFormateur");
          }}
        >
          Ajouter un formateur
        </Button>
      </div>
      <div className="w-100">
        <Table className="table text-center" hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentFormateur.map((formateur, index) => (
              <tr key={formateur.id}>
                <td>{index + 1}</td>
                <td>{formateur.nom}</td>
                <td>{formateur.prenom}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button
                      variant="warning"
                      onClick={() => {
                        navigate(`/modifFormateur/${formateur.id}`);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => {
                        let choice = window.confirm(
                          "Voulez-vous vraiment supprimer ce formateur ?"
                        );
                        if (choice) {
                          axios
                            .delete(
                              `http://localhost:8000/formateur/${formateur.id}`
                            )
                            .then((response) => {
                              console.log(response.data);
                              alert("Formateur supprimé");
                              setReload(!reload);
                            })
                            .catch((error) => {
                              console.error("Error fetching data: ", error);
                            });
                        }
                      }}
                      variant="danger"
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {Array.from(
            { length: Math.ceil(formateurs.length / formateurPerPage) },
            (_, i) => (
              <Pagination.Item
                key={i + 1}
                onClick={() => paginate(i + 1)}
                active={i + 1 === currentPage}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </div>
  );
}

export default FormateurPage;
