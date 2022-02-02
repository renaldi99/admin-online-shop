import FIREBASE from "config/FIREBASE";
import { dispatchLoading, dispatchSuccess, dispatchError } from "../utils";

export const GET_LIST_CATALOG = "GET_LIST_CATALOG";
export const ADD_CATALOG = "ADD_CATALOG";
export const GET_DETAIL_CATALOG = "GET_DETAIL_CATALOG";
export const UPDATE_CATALOG = "UPDATE_CATALOG";
export const DELETE_CATALOG = "DELETE_CATALOG";

export const getListCatalog = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_CATALOG);

    FIREBASE.database()
      .ref("catalogs")
      .once("value", (querySnapshot) => {
        //result
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_CATALOG, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_CATALOG, error);
        alert(error);
      });
  };
};

export const addCatalog = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_CATALOG);

    var uploadTask = FIREBASE.storage()
      .ref("catalogs")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newData = {
            namaKatalog: data.nameCatalog,
            image: downloadURL,
          };

          FIREBASE.database()
            .ref("catalogs")
            .push(newData)
            .then((response) => {
              dispatchSuccess(dispatch, ADD_CATALOG, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, ADD_CATALOG, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const getDetailCatalog = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_CATALOG);

    FIREBASE.database()
      .ref("catalogs/" + id)
      .once("value", (querySnapshot) => {
        //result
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_CATALOG, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_CATALOG, error);
        alert(error);
      });
  };
};

export const updateCatalog = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_CATALOG);

    // check! change image or not
    if (data.imageToDB) {
      // take and delete old image from firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.oldImage);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          // success upload new image
          var uploadTask = FIREBASE.storage()
            .ref("catalogs")
            .child(data.imageToDB.name)
            .put(data.imageToDB);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newData = {
                  namaKatalog: data.nameCatalog,
                  image: downloadURL,
                };

                // realtime update
                FIREBASE.database()
                  .ref("catalogs/" + data.id)
                  .update(newData)
                  .then((response) => {
                    dispatchSuccess(
                      dispatch,
                      UPDATE_CATALOG,
                      response ? response : []
                    );
                  })
                  .catch((error) => {
                    dispatchError(dispatch, UPDATE_CATALOG, error);
                    alert(error);
                  });
              });
            }
          );
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_CATALOG, error);
          alert(error);
        });
    } else {
      const newData = {
        namaKatalog: data.nameCatalog,
        image: data.image,
      };

      FIREBASE.database()
        .ref("catalogs/" + data.id)
        .update(newData)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_CATALOG, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_CATALOG, error);
          alert(error);
        });
    }
  };
};

export const deteleCatalog = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_CATALOG);

    //delete from storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(() => {
        // File deleted successfully
        // delete from realtime database
        FIREBASE.database()
          .ref("catalogs/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(
              dispatch,
              DELETE_CATALOG,
              "CATALOG SUCCESS DELETED"
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_CATALOG, error);
            alert(error);
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_CATALOG, error);
        alert(error);
      });
  };
};
