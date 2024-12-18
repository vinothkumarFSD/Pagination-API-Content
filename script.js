let apiurl = 'https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json';
let tablebody = document.getElementById("table-body");
let paginationcontrols = document.getElementById("pagintion-controls");
let rowsperpage = 5;
let buttonsperset = 5;
let currentpage = 1;
let res = [];
function fetchdata() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiurl);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            res = JSON.parse(xhr.responseText);
            rendertable();
            renderpagination();
        } else {
            console.error("Request failed with status:", xhr.status);
        }
    };
}
function rendertable() {
    tablebody.innerHTML = "";
    let startIndex = (currentpage - 1) * rowsperpage;
    let endIndex = startIndex + rowsperpage;
    let currentpagedata = res.slice(startIndex, endIndex);

    currentpagedata.forEach((item) => {
        let rows = document.createElement('tr');
        rows.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            `;
        tablebody.append(rows);
    });
}

function renderpagination() {

    paginationcontrols.innerHTML = "";
    let totalpages = Math.ceil(res.length / rowsperpage);
    let currentset = Math.floor((currentpage - 1) / buttonsperset);

    let firstButton = document.createElement('button');
    firstButton.textContent = '<<';
    firstButton.disabled = currentpage === 1;
    //firstButton.classList.add(currentpage === 1 ? "disabled" : "");
    firstButton.addEventListener("click", () => changepage(1));
    paginationcontrols.append(firstButton);

    let prevbutton = document.createElement('button');
    prevbutton.textContent = "<";
    prevbutton.disabled = currentset === 0;
    //prevbutton.classList.add(currentset === 0 ? "disabled" : "");
    prevbutton.addEventListener('click', () => changepage((currentset-1)*buttonsperset+1));
    paginationcontrols.append(prevbutton);

    const startPage = currentset * buttonsperset + 1;
    const endPage = Math.min(startPage + buttonsperset - 1, totalpages);

    for (let i = startPage; i <= endPage; i++) {
        let pagebutton = document.createElement('button');
        pagebutton.textContent = i;
        pagebutton.className = i === currentpage ? 'active' : '';
        pagebutton.addEventListener('click', () => changepage(i));
        paginationcontrols.append(pagebutton);
    };

    let nextbutton = document.createElement('button');
    nextbutton.textContent = '>';
    nextbutton.disabled = endPage === totalpages;
    // nextbutton.classList.add(endPage === totalpages ? "disabled" : "");
    nextbutton.addEventListener("click", () => changepage(endPage + 1));
    paginationcontrols.append(nextbutton);

    let lastbutton=document.createElement('button');
    lastbutton.textContent='>>';
    lastbutton.disabled=currentpage===totalpages;
    // lastbutton.classList.add(currentpage === totalpages ? "disabled" : "");
    lastbutton.addEventListener('click',()=>changepage(totalpages));
    paginationcontrols.append(lastbutton);
}

function changepage(page) {
    currentpage = page;
    rendertable();
    renderpagination();
}

fetchdata();

