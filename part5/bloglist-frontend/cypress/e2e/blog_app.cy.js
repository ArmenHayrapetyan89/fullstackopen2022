describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Regina Phalange",
      username: "rphalange",
      password: "secret",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("rphalange");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();

      cy.contains("rphalange logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("hsimpson");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "rphalange", password: "secret" });
    });

    it("A blog can be created", function () {
      cy.get(".create-button").click();
      cy.get(".title-field").type("Saxophon");
      cy.get(".author-field").type("Lisa Simpson");
      cy.get(".url-field").type("https://de.wikipedia.org/wiki/Saxophon");

      cy.get(".create-blog-button").click();
      cy.get(".view-hide-button").click();
    });

    describe("interacting with blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Saxophon",
          author: "Lisa Simpson",
          url: "https://de.wikipedia.org/wiki/Saxophon",
        });
        cy.reload();
        cy.get(".view-hide-button").click();
      });

      it("a blog can be liked", function () {
        cy.get(".like-button").click();
      });

      it("a blog can be deleted", function () {
        cy.get(".delete-blog").click();
      });
    });

    describe("sorting blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Saxophone",
          author: "Lisa Simpson",
          url: "https://de.wikipedia.org/wiki/Saxophon",
        });

        cy.createBlog({
          title: "Drums",
          author: "Bart Simpson",
          url: "https://de.wikipedia.org/wiki/Schlagzeug",
        });
        cy.reload();
      });

      it("sorting blogs", function () {
        cy.get(".view-hide-button").click({ multiple: true });
        cy.get(".like-button").eq(0).click();
        cy.get(".like-button").eq(1).click();
        cy.get(".like-button").eq(1).click();
        cy.reload();
        cy.get(".view-hide-button").click({ multiple: true });

        cy.get(".likesContent")
          .eq(0)
          .invoke("text")
          .then((text) => {
            const like1 = parseInt(text);

            cy.get(".likesContent")
              .eq(1)
              .invoke("text")
              .then((text) => {
                const like2 = parseInt(text);
                expect(like1).to.be.greaterThan(like2);
              });
          });
      });
    });
  });
});
