import data from '../../data/data';

// A mock function to mimic making an async request for data
export function fetchProductData(productId) {

    // since we are mocking the response from a local file but to keep correct encapsulation/abstraction
    // we are setting the productId as the one in the mock data
    productId = "B007TIE0GQ" ;
    let productInfo = data.find( productInfo => productInfo.id == productId);

    return new Promise((resolve) =>
        {
            setTimeout(() => resolve(productInfo), 50)
        }
    );
}
  