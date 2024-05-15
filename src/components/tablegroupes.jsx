import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Pagination } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import Loading from "./loading";

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
    axios
      .get("http://localhost:8000/groupe")
      .then((response) => {
        setGroupes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

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
  const groupesPerPage = 3; //

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
      <div className="d-flex flex-row flex-wrap text-center gap-5 ">
        {currentGroupes.map((groupe) => (
          <div className="w-auto mx-auto">
            <h4 key={groupe.id}>{groupe.nom}</h4>
            <Table className="text-center border" hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Sexe</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {groupe &&
                  groupe.apprenants.map((apprenant, index) => (
                    <tr key={apprenant.id}>
                      <td>{index + 1}</td>
                      <td>{apprenant.nom}</td>
                      <td>{apprenant.prenom}</td>
                      <td>{apprenant.sexe}</td>
                      <td>{apprenant.age}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
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
