let counter = 0;
let currentModalCat = "";
let selectedCats = [];

const catsData = [
    {
        name: "Luna",
        description: "Luna is a calm and gentle cat. She loves warm blankets, quiet rooms and soft cuddles. She would be perfect for someone who wants a peaceful companion.",
        age: "2 years old",
        personality: "Calm and sweet",
        home: "Quiet home",
        tag: "Calm"
    },
    {
        name: "Mimi",
        description: "Mimi is funny, energetic and very curious. She loves toys, attention and little adventures around the house.",
        age: "1 year old",
        personality: "Playful and active",
        home: "Active owner",
        tag: "Playful"
    },
    {
        name: "Sunny",
        description: "Sunny is friendly, bright and social. She enjoys meeting new people and watching the world from the window.",
        age: "3 years old",
        personality: "Friendly and social",
        home: "Family home",
        tag: "Social"
    },
    {
        name: "Peach",
        description: "Peach is shy at first, but very loving when she feels safe. She needs a kind and patient owner.",
        age: "2.5 years old",
        personality: "Shy but loving",
        home: "Patient owner",
        tag: "Gentle"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const number = document.getElementById("number");
    const message = document.getElementById("message");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const selectedList = document.getElementById("selectedList");
    const emptyText = document.getElementById("emptyText");

    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");

    const viewCatsBtn = document.getElementById("viewCatsBtn");
    const meetCatsBtn = document.getElementById("meetCatsBtn");
    const randomCatBtn = document.getElementById("randomCatBtn");

    const modal = document.getElementById("catModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const addModalCatBtn = document.getElementById("addModalCatBtn");

    plusButton.addEventListener("click", function () {
        counter++;
        updateCounter();
    });

    minusButton.addEventListener("click", function () {
        if (counter > 0) {
            counter--;
            selectedCats.pop();
            updateCounter();
            renderSelectedCats();
        }
    });

    viewCatsBtn.addEventListener("click", scrollToCats);
    meetCatsBtn.addEventListener("click", scrollToCats);
    randomCatBtn.addEventListener("click", randomCat);

    closeModalBtn.addEventListener("click", closeModal);

    addModalCatBtn.addEventListener("click", function () {
        if (currentModalCat !== "") {
            addNamedCat(currentModalCat);
        }

        closeModal();
    });

    const aboutButtons = document.querySelectorAll(".about-btn");

    aboutButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            openModal(
                button.dataset.name,
                button.dataset.description,
                button.dataset.age,
                button.dataset.personality,
                button.dataset.home,
                button.dataset.tag
            );
        });
    });

    const addButtons = document.querySelectorAll("[data-add]");

    addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            addNamedCat(button.dataset.add);
        });
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    function updateCounter() {
        number.innerText = counter;

        if (counter === 0) {
            message.innerText = "Choose your cats ♡";
        } else if (counter === 1) {
            message.innerText = "You selected 1 cat";
        } else {
            message.innerText = "You selected " + counter + " cats";
        }

        let progress = Math.min((counter / 4) * 100, 100);

        progressFill.style.width = progress + "%";
        progressText.innerText = Math.min(counter, 4) + " / 4";
    }

    function addNamedCat(name) {
        counter++;
        selectedCats.push(name);
        updateCounter();
        renderSelectedCats();
    }

    function renderSelectedCats() {
        selectedList.innerHTML = "";

        if (selectedCats.length === 0) {
            emptyText.style.display = "block";
            return;
        }

        emptyText.style.display = "none";

        selectedCats.forEach(function (catName, index) {
            const item = document.createElement("div");

            item.className = "selected-item";
            item.innerHTML = "<span>" + catName + "</span><span>#" + (index + 1) + "</span>";

            selectedList.appendChild(item);
        });
    }

    function openModal(name, description, age, personality, home, tag) {
        currentModalCat = name;

        document.getElementById("modalName").innerText = name;
        document.getElementById("modalDescription").innerText = description;
        document.getElementById("modalAge").innerText = age;
        document.getElementById("modalPersonality").innerText = personality;
        document.getElementById("modalHome").innerText = home;
        document.getElementById("modalTag").innerText = tag;

        modal.style.display = "flex";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function scrollToCats() {
        document.getElementById("cats").scrollIntoView({
            behavior: "smooth"
        });
    }

    function randomCat() {
        const randomIndex = Math.floor(Math.random() * catsData.length);
        const cat = catsData[randomIndex];

        openModal(
            cat.name,
            cat.description,
            cat.age,
            cat.personality,
            cat.home,
            cat.tag
        );
    }

    updateCounter();
    renderSelectedCats();
});