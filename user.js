class User extends HTMLElement {
    set user(user) {
        this.innerHTML = `
        <div class="user-component">
        <h1>${user.name}</h1>
        <p>${user.email}</p>
        </div>
        `;
    }
}
customElements.define("user-component", User);
