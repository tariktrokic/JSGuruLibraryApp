export const renderAllRequests = (requests) => {
    let display = document.querySelector('.requests');
    requests.data.forEach((el) => {
        let html = `<div class="request">
                        <p class="requestinfo">${el.User.user_name} wants to borrow ${el.Book.book_name}</p>
                        <button class="button-request requestaccept" data-requestid='${el.request_id}'>Accept</button>
                        <button class="button-request requestreject" data-requestid='${el.request_id}'>Reject</button>
                    </div>`;
        display.insertAdjacentHTML('beforeend',html);
    }); 
};
