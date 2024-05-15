import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

import Pagination from "react-bootstrap/Pagination";

function MyTable() {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const formationsPerPage = 5; //

  // Index du dernier apprenant de la page
  const indexOfLastFormation = currentPage * formationsPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  // Apprenants de la page actuelle
  const currentFormation = formations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    document.title = "Formation";

    axios
      .get("http://localhost:8000/formation")
      .then((response) => {
        setFormations(response.data);
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

  return (
    <>
      <Table className="text-center border" hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Formateur</th>
            <th>Duree</th>
            <th>NbApprenant</th>
            <th>NbGroupes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFormation.map((formation, index) => (
            <tr key={formation.id}>
              <td>{index + 1}</td>
              <td>{formation.nom}</td>
              <td>{formation.formateur}</td>
              <td>{formation.duree}</td>
              <td>{formation.apprenants?.length}</td>
              <td>{formation.groupes?.length}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    onClick={() => {
                      navigate(`/detailsFormation/${formation.id}`);
                    }}
                    variant="info"
                  >
                    Détails
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/modifFormation/${formation.id}`);
                    }}
                    variant="warning"
                  >
                    Modifier
                  </Button>

                  <Button
                    onClick={() => {
                      let choice = window.confirm(
                        "Voulez-vous vraiment supprimer cette formation ?"
                      );
                      if (choice) {
                        axios
                          .delete(
                            `http://localhost:8000/formation/${formation.id}`
                          )
                          .then((response) => {
                            console.log(response.data);
                            alert("Formation supprimée");
                            setReload(!reload);
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
          { length: Math.ceil(formations.length / formationsPerPage) },
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
    </>
  );
}

function TableFormation() {
  return <MyTable />;
}

export default TableFormation;
