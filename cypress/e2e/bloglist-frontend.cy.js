describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "freaky freddy",
      username: "freaky",
      password: "sparrow",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.contains("username");
    cy.contains("password");
  });
});

describe("login", function () {
  it("succeeds with correct credentials", function () {
    cy.get("#username").type("freaky");
    cy.get("#password").type("sparrow");
    cy.get("#submit").click();

    cy.contains("freaky freddy logged in");
  });
  it("fails with wrong credentials", function () {
    cy.contains("logout").click();
    cy.get("#username").type("freak");
    cy.get("#password").type("sparrow");
    cy.get("#submit").click();

    cy.contains("Wrong credentials");

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)");
  });

  describe("When logged in", function () {
    it("A blog can be created", function () {
      cy.login({ username: "freaky", password: "sparrow" });
      cy.contains("new note").click();
      cy.get("#title").type("First class tests");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#create-button").click();
      cy.contains("First class tests Edsger W. Dijkstra");
      // cy.get(".success")
      //   .should(
      //     "contain",
      //     "First class tests by Edsger W. Dijkstra was successfully added."
      //   )
      //   .and("have.css", "color", "rgb(0, 255, 0)");
    });
    it("user can like a blog", function () {
      cy.contains("new note").click();
      cy.get("#title").type("First class tests");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#create-button").click();
      cy.contains("First class tests Edsger W. Dijkstra").click();
      cy.contains("view").click();
      cy.contains("0");
      cy.get("#like-button").click();
      cy.contains("1");
    });

  });
  describe("When logged in", function () {
    it("A blog can be created", function () {
      cy.login({ username: "freaky", password: "sparrow" });
      cy.contains("new note").click();
      cy.get("#title").type("First class tests");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#create-button").click();
      cy.contains("First class tests Edsger W. Dijkstra");
      // cy.get(".success")
      //   .should(
      //     "contain",
      //     "First class tests by Edsger W. Dijkstra was successfully added."
      //   )
      //   .and("have.css", "color", "rgb(0, 255, 0)");
    });
    it("user can like a blog", function () {
      cy.contains("new note").click();
      cy.get("#title").type("First class tests");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#create-button").click();
      cy.contains("First class tests Edsger W. Dijkstra").click();
      cy.contains("view").click();
      cy.contains("0");
      cy.get("#like-button").click();
      cy.contains("1");
    });
});
