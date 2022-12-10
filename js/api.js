const ApiUrls = {
  ROOT: 'https://27.javascript.pages.academy/keksobooking',
  DATA: 'https://27.javascript.pages.academy/keksobooking/data'
};

const getData = (onSuccess, onError) => {
  fetch(ApiUrls.DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onError, dataForPost) => {
  fetch(
    ApiUrls.ROOT,
    {
      method: 'POST',
      body: dataForPost,
    },
  )
    .then((response) => response.json())
    .then((values) => {
      onSuccess(values);
    }).catch(() => {
      onError();
    });
};

export {getData, sendData};
