import FIREBASE from "config/FIREBASE";
import { dispatchLoading, dispatchSuccess, dispatchError } from "../utils";

export const GET_LIST_PRODUCT = "GET_LIST_PRODUCT";
export const UPLOAD_PRODUCT = "UPLOAD_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getListProduct = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PRODUCT);

    FIREBASE.database()
      .ref("products")
      .once("value", (querySnapshot) => {
        //result
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PRODUCT, error);
        alert(error);
      });
  };
};

export const uploadProduct = (img, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_PRODUCT);

    var uploadTask = FIREBASE.storage()
      .ref("products")
      .child(img.name)
      .put(img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        dispatchError(dispatch, UPLOAD_PRODUCT, error);
        alert(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newData = {
            image: downloadURL,
            imageToDB: imageToDB,
          };

          dispatchSuccess(dispatch, UPLOAD_PRODUCT, newData);
        });
      }
    );
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PRODUCT);

    const newData = {
      nama: data.nama,
      gambar: [data.image1ToDB, data.image2ToDB],
      harga: data.harga,
      jenis: data.jenis,
      berat: data.berat,
      log: data.log,
      ready: data.ready,
      ukuran: data.ukuranSelected,
    };

    FIREBASE.database()
      .ref("products")
      .push(newData)
      .then((response) => {
        dispatchSuccess(dispatch, ADD_PRODUCT, response);
      })
      .catch((error) => {
        dispatchError(dispatch, ADD_PRODUCT, error);
        alert(error);
      });
  };
};

export const getDetailProduct = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PRODUCT);

    FIREBASE.database()
      .ref("products/" + id)
      .once("value", (querySnapshot) => {
        //result
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_PRODUCT, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_PRODUCT, error);
        alert(error);
      });
  };
};

export const updateProduct = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PRODUCT);

    const newData = {
      nama: data.nama,
      gambar: [
        data.image1ToDB ? data.image1ToDB : data.oldImage1,
        data.image2ToDB ? data.image2ToDB : data.oldImage2,
      ],
      harga: data.harga,
      jenis: data.jenis,
      berat: data.berat,
      log: data.log,
      ready: data.ready,
      ukuran: data.ukuranSelected,
    };

    FIREBASE.database()
      .ref("products/" + data.id)
      .update(newData)
      .then((response) => {
        // jika update baru image1ToDB mendapatkan url baru lalu menghapus image lama dengan wadah (oldImage1)
        if (data.image1ToDB) {
          var desertRef = FIREBASE.storage().refFromURL(data.oldImage1);
          desertRef.delete().catch((error) => {
            dispatchError(dispatch, UPDATE_PRODUCT, error);
          });
        }
        // jika update baru image2ToDB mendapatkan url baru lalu menghapus image lama dengan wadah (oldImage2)
        if (data.image2ToDB) {
          var desertRef1 = FIREBASE.storage().refFromURL(data.oldImage2);
          desertRef1.delete().catch((error) => {
            dispatchError(dispatch, UPDATE_PRODUCT, error);
          });
        }

        dispatchSuccess(dispatch, UPDATE_PRODUCT, "Success Product Updated");
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PRODUCT, error);
        alert(error);
      });
  };
};

export const deleteProduct = (images, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PRODUCT);
    var desertRef = FIREBASE.storage().refFromURL(images[0]);
    desertRef
      .delete()
      .then(() => {
        if (images[1]) {
          var desertRef1 = FIREBASE.storage().refFromURL(images[1]);
          desertRef1
            .delete()
            .then(() => {
              // hapus di database
              FIREBASE.database()
                .ref("products/" + id)
                .remove()
                .then(() => {
                  dispatchSuccess(
                    dispatch,
                    DELETE_PRODUCT,
                    "Success Product Deleted"
                  );
                })
                .catch((error) => {
                  dispatchError(dispatch, DELETE_PRODUCT, error);
                });
            })
            .catch((error) => {
              dispatchError(dispatch, DELETE_PRODUCT, error);
            });
        } else {
          // hapus di database
          FIREBASE.database()
            .ref("products/" + id)
            .remove()
            .then(() => {
              dispatchSuccess(
                dispatch,
                DELETE_PRODUCT,
                "Success Product Deleted"
              );
            })
            .catch((error) => {
              dispatchError(dispatch, DELETE_PRODUCT, error);
            });
        }
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_PRODUCT, error);
      });
  };
};
