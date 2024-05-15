import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DetailsFormation() {
  const [formation, setFormation] = useState({
    formateur: {
      id: "",
      nom: "",
      prenom: "",
      formations: [],
    },
    nom: "",
    duree: "",
    groupes: [],
  });
  let { id } = useParams();

  useEffect(() => {
    document.title = `Details de la formation ${id}`;

    axios
      .get(`http://localhost:8000/formation/${id}`)
      .then((response) => {
        console.log(response.data[0]);
        setFormation({
          formateur: {
            id: response.data[0].formateur[0].id,
            nom: response.data[0].formateur[0].nom,
            prenom: response.data[0].formateur[0].prenom,
            formations: response.data[0].formateur[0].formations,
          },
          nom: response.data[0].nom,
          duree: response.data[0].duree,
          groupes: response.data[0].groupes,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);
  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h2 className="text-center w-100 mb-5">
        Formation dispensé par{" "}
        {formation.formateur.prenom + " " + formation.formateur.nom}
      </h2>
      <div className="w-100">
        <div>
          <h6 className="text-primary">
            <span className="text-decoration-underline text-dark">
              Nom de la formation:
            </span>{" "}
            {formation.nom}
          </h6>
          <h6 className="text-primary">
            <span className="text-decoration-underline text-dark">
              Durée de la formation:
            </span>{" "}
            {formation.duree}
          </h6>
          <h6 className="text-primary">
            <span className="text-decoration-underline text-dark">
              Nombres de groupes:
            </span>{" "}
            {formation.groupes.length}
          </h6>
          <h6 className="text-primary">
            <span className="text-decoration-underline text-dark">
              Nombre d'apprenants:
            </span>{" "}
            {formation.groupes.reduce(
              (acc, groupe) => acc + groupe.apprenants.length,
              0
            )}
          </h6>
        </div>
        <h4 className="my-4">Groupes:</h4>
        {formation.groupes?.map((groupe) => (
          <div>
            <h5 className="my-2">{groupe.nom}</h5>
            <div>
              <h6 className="my-2">Apprenants:</h6>
              <Table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Sexe</th>
                    <th>Age</th>
                    <th>Compétences</th>
                  </tr>
                </thead>
                <tbody>
                  {groupe.apprenants.map((apprenant) => (
                    <tr>
                      <td>{apprenant.id}</td>
                      <td>{apprenant.nom}</td>
                      <td>{apprenant.prenom}</td>
                      <td>{apprenant.sexe}</td>
                      <td>{apprenant.age}</td>
                      <td>
                        {apprenant.competences.map(
                          (competence) => competence.nom + " "
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ))}
      </div>
      <div className="w-100">
        <h4>Formateur:</h4>
        <div>
          <h6 className="text-warning"><span className="text-decoration-underline text-dark">Nom:</span> {formation.formateur.nom}</h6>
          <h6 className="text-warning"><span className="text-decoration-underline text-dark">Prénom:</span> {formation.formateur.prenom}</h6>
        </div>
        <h4 className="my-3">
          Toutes les formations dirigé par{" "}
          {formation.formateur.prenom + " " + formation.formateur.nom}
        </h4>
        <Table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Durée</th>
              <th>Nombre de groupes</th>
            </tr>
          </thead>
          <tbody>
            {formation.formateur.formations?.map((formation, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{formation.nom}</td>
                <td>{formation.duree}</td>
                <td>{formation.groupes.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DetailsFormation;
