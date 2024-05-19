import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import Loading from "../components/loading";
import api from "../api/axios.api";

function AddApprenantInFormation() {
  const [formations, setFormations] = useState([]);
  const [currentFormation, setCurrentFormation] = useState();
  const [competences, setCompetences] = useState([]);
  const [apprenants, setApprenants] = useState([]);
  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(true);

  // État pour suivre les compétences sélectionnées
  const [selectedCompetences, setSelectedCompetences] = useState([]);

  // État pour suivre la valeur de l'âge sélectionnée
  const [selectedAge, setSelectedAge] = useState("");

  // Etat pour suivre la valeur du sexe sélectionné
  const [selectedSexe, setSelectedSexe] = useState("");

  // Fonction de filtrage pour filtrer les apprenants en fonction des compétences et de l'âge sélectionnés
  const filterApprenants = () => {
    let filteredApprenants = apprenants;

    // Filtrer les apprenants en fonction des compétences sélectionnées
    if (selectedCompetences.length > 0) {
      filteredApprenants = filteredApprenants.filter((apprenant) =>
        selectedCompetences.every((competence) =>
          apprenant.competences.some(
            (apprenantCompetence) => apprenantCompetence.nom === competence
          )
        )
      );
    }

    // Filtrer les apprenants en fonction de l'âge sélectionné
    if (selectedAge !== "") {
      filteredApprenants = filteredApprenants.filter(
        (apprenant) => apprenant.age >= parseInt(selectedAge)
      );
    }

    if (selectedSexe !== "") {
      filteredApprenants = filteredApprenants.filter(
        (apprenant) => apprenant.sexe === selectedSexe
      );
    }
    return filteredApprenants;
  };

  // Interface utilisateur pour sélectionner l'âge
  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };

  useEffect(() => {
    document.title = "Ajout d'un apprenant dans une formation";
    api
      .get("/formation/")
      .then((response) => {
        setFormations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("/competence/")
      .then((response) => {
        setCompetences(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("/apprenant/")
      .then((response) => {
        setApprenants(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [reload]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const apprenantsPerPage = 5; // Nombre d'apprenants par page

  // Index du dernier apprenant de la page
  const indexOfLastApprenant = currentPage * apprenantsPerPage;
  // Index du premier apprenant de la page
  const indexOfFirstApprenant = indexOfLastApprenant - apprenantsPerPage;
  // Apprenants filtrés de la page actuelle
  const currentApprenants = filterApprenants().slice(
    indexOfFirstApprenant,
    indexOfLastApprenant
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <form className="w-100 mx-auto">
        <div className="w-100 d-flex gap-5 flex-row">
          <div className="w-50 d-flex flex-column gap-2 justify-content-center mb-5">
            <div className="w-100">
              <h5>Compétences:</h5>
              <select
                required
                multiple
                className="form-select w-100 m-auto mb-4"
                onChange={(e) => {
                  setSelectedCompetences(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  );
                }}
              >
                {competences.map((competence) => (
                  <option
                    selected={
                      selectedCompetences.includes(competence.nom)
                        ? true
                        : false
                    }
                    value={competence.nom}
                    key={competence.id}
                  >
                    {competence.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-100">
              <h5>Sexe:</h5>
              <select
                required
                className="form-select w-100 m-auto mb-2"
                onChange={(e) => {
                  setSelectedSexe(e.target.value);
                }}
              >
                <option value="">Choisir un sexe</option>
                <option
                  selected={selectedSexe === "Homme" ? true : false}
                  value="Homme"
                >
                  Homme
                </option>
                <option
                  selected={selectedSexe === "Femme" ? true : false}
                  value="Femme"
                >
                  Femme
                </option>
              </select>
            </div>
            <div className="w-100">
              <h5>Age:</h5>
              <div className="w-100  gap-2 d-flex flex-wrap"> 
              <input
                required
                max={70}
                min={13}
                placeholder="0"
                type="number"
                value={selectedAge}
                className="form-control w-auto"
                onChange={handleAgeChange}
              />
              <Button
              className="btn btn-danger w-auto"
              onClick={() => {
                setSelectedAge("");
                setSelectedSexe("");
                setSelectedCompetences([]);
              }}
            >
              Supprimer les filtres
            </Button>
              </div>
            </div>
          </div>

          <div className="w-50">
            <h6 className="mt-2">Sélectionnez une formation pour lui ajouter des apprenants:</h6>
            <select
              className="form-select w-100 m-auto"
              onChange={(e) => {
                setCurrentFormation(e.target.value);
                console.log(currentFormation);
              }}
            >
              <option>Choisir une formation</option>
              {formations.map((formation) => (
                <option value={formation.id} key={formation.id}>
                  {formation.nom}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Table className="table text-center" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Sexe</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentApprenants.map((apprenant, index) => (
              <>
                <tr key={apprenant.id}>
                  <td>{ index+1 }</td>
                  <td>{apprenant.nom}</td>
                  <td>{apprenant.prenom}</td>
                  <td>{apprenant.sexe}</td>
                  <td>{apprenant.age}</td>

                  <td>
                    <Button
                      disabled={
                        apprenant.formations
                          .map((formation) => formation.id)
                          .includes(parseInt(currentFormation))
                          ? true
                          : false
                      }
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        api
                          .post(
                            `/apprenant/${apprenant.id}/ajoutFormation`,
                            { formation: parseInt(currentFormation) }
                          )
                          .then((response) => {
                            console.log(response.data);
                            setReload(!reload);
                          })
                          .catch((error) => {
                            console.error("Error fetching data: ", error);
                          });
                      }}
                    >
                      Ajouter
                    </Button>
                    <Button
                      disabled={
                        apprenant.formations
                          .map((formation) => formation.id)
                          .includes(parseInt(currentFormation))
                          ? false
                          : true
                      }
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        api
                          .post(
                            `/apprenant/${apprenant.id}/removeFormation`,
                            { formation: currentFormation }
                          )
                          .then((response) => {
                            console.log(response.data);
                            setReload(!reload);
                          })
                          .catch((error) => {
                            console.error("Error fetching data: ", error);
                          });
                      }}
                    >
                      Enlever
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </form>
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(filterApprenants().length / apprenantsPerPage) },
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
  );
}

export default AddApprenantInFormation;
