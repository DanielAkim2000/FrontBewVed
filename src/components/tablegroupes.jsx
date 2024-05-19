import React, { useEffect, useState } from "react";
import { Card, Pagination } from "react-bootstrap";

import Loading from "./loading";
import api from "../api/axios.api";

function MyTable() {
  const [groupes, setGroupes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formations, setFormations] = useState({
    id: "",
    nom: "",
    duree: "",
    formateur: "",
  });

  useEffect(() => {
    document.title = "Groupes";
    api
      .get("/groupe")
      .then((response) => {
        setGroupes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("/formation")
      .then((response) => {
        setFormations(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const [selectedFormation, setSelectedFormation] = useState("");
  //filtre par formations
  const filtreGroupes = () => {
    let filteredGroupes = groupes;

    if (selectedFormation !== "") {
      filteredGroupes = groupes.filter(
        (groupe) => groupe.formation === selectedFormation
      );
    }

    return filteredGroupes;
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const groupesPerPage = 6; //

  // Index du dernier apprenant de la page
  const indexOfLastGroup = currentPage * groupesPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstGroup = indexOfLastGroup - groupesPerPage;
  // Apprenants de la page actuelle
  const currentGroupes = filtreGroupes().slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <h4 className="text-center w-100">Formations:</h4>
      <select
        className="form-select w-auto mb-5 mx-auto"
        onChange={(e) => setSelectedFormation(e.target.value)}
      >
        <option value="">Toutes les formations</option>
        {formations.map((formation) => (
          <option key={formation.id} value={formation.nom}>
            {formation.nom}
          </option>
        ))}
      </select>
      <div className="d-flex w-100 justify-content-center flex-row flex-wrap gap-5 ">
        {currentGroupes.map((groupe) => (
          <Card
            key={groupe.id}
            bg="light"
            text="dark"
            className="m-2 col-12 col-sm-12 col-md-8 col-lg-4 col-xl-3 bond"
          >
            <Card.Header as="h5" className="text-success text-center">
              {groupe.nom}
            </Card.Header>
            <Card.Body>
              <Card.Title>Informations:</Card.Title>
              <Card.Text>
                <ul className="text-primary">
                  <li>
                    <span className="text-dark">Formation: </span>{" "}
                    {groupe.formation}
                  </li>
                  <li>
                    <span className="text-dark">Nombre d'apprenants: </span>{" "}
                    {groupe.apprenants.length}
                  </li>
                  <li>
                    <span className="text-dark">Formateur: </span>{" "}
                    {groupe.formateur}
                  </li>
                </ul>
              </Card.Text>
              <Card.Title>Apprenants:</Card.Title>
              <Card.Text>
                <ul>
                  {groupe.apprenants.map((apprenant) => (
                    <li>
                      {apprenant.nom} {apprenant.prenom}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(filtreGroupes().length / groupesPerPage) },
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

export default function TableGroupes() {
  return <MyTable />;
}
