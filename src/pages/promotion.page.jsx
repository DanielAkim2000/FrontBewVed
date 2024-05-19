import React, { useEffect, useState } from "react";
import Loading from "../components/loading";
import { Button, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.api";

function PromotionPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Promotions";
    api
      .get("/promotion/")
      .then((response) => {
        setPromotions(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [reload]);

   // pagination
   const [currentPage, setCurrentPage] = useState(1);
   const promotionsPerPage = 5; //
 
   // Index du dernier apprenant de la page
   const indexOfLastPromotion = currentPage * promotionsPerPage;
   // Index du premier apprenant de la page
   const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
   // Apprenants de la page actuelle
   const currentPromotions = promotions.slice(
     indexOfFirstPromotion,
     indexOfLastPromotion
   );
 
   // Changer de page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="rounded p-5 bg-body-secondary w-75  mx-auto">
      <h2 className="text-center">Promotions</h2>
      <Button
        onClick={() => {
          navigate("/addPromotion");
        }}
        className="btn btn-success my-2"
      >
        Ajouter une promotion
      </Button>
      <Table className="table text-center" hover responsive>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPromotions.map((promotion, index) => (
            <tr key={promotion.id}>
              <td>{index + 1}</td>
              <td>{promotion.nom}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    onClick={() => {
                      navigate(`/modifPromotion/${promotion.id}`);
                    }}
                    className="btn btn-warning"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => {
                      let choice = window.confirm(
                        "Voulez-vous vraiment supprimer cette promotion?"
                      );
                      if (choice) {
                        api
                          .delete(
                            `/promotion/${promotion.id}`
                          )
                          .then((response) => {
                            console.log(response.data);
                            setReload(!reload);
                          })
                          .catch((error) => {
                            console.error("Error deleting promotion: ", error);
                          });
                      }
                    }}
                    className="btn btn-danger"
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
          { length: Math.ceil(promotions.length / promotionsPerPage) },
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

export default PromotionPage;
