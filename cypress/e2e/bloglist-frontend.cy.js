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

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("freaky");
      cy.get("#password").type("sparrow");
      cy.get("#submit").click();

      cy.contains("freaky freddy logged in");
    });
    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("freak");
      cy.get("#password").type("sparrow");
      cy.get("#submit").click();

      cy.contains("Wrong credentials");

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "freaky", password: "sparrow" });
      });
      it("A blog can be created", function () {
        // cy.login({ username: "freaky", password: "sparrow" });
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
        // cy.login({ username: "freaky", password: "sparrow" });

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

      it("Only blog created by user can be deleted by them", function () {
        // cy.login({ username: "freaky", password: "sparrow" });
        cy.contains("new note").click();
        cy.get("#title").type("First class tests");
        cy.get("#url").type(
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
        );
        it("Only blog created by user can be deleted by them", function () {
          // cy.login({ username: "freaky", password: "sparrow" });
          cy.contains("new note").click();
          cy.get("#title").type("First class tests");
          cy.get("#url").type(
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
          );
          cy.get("#author").type("Edsger W. Dijkstra");
          cy.get("#create-button").click();
          cy.contains("First class tests Edsger W. Dijkstra");
          cy.contains("view").click();
          cy.get("#remove-button").click();
          cy.get("html").should(
            "not.contain",
            "First class tests Edsger W. Dijkstra"
          );
        });
        cy.get("#author").type("Edsger W. Dijkstra");
        cy.get("#create-button").click();
        cy.contains("First class tests Edsger W. Dijkstra");
        cy.contains("view").click();
        cy.get("#remove-button").click();
        cy.get("html").should(
          "not.contain",
          "First class tests Edsger W. Dijkstra"
        );
      });

      describe("blog arranged in terms of likes", function () {
        beforeEach(function () {
          cy.login({ username: "freaky", password: "sparrow" });
          cy.createBlog({
            author: "Shane",
            title: "Blog1",
            url: "http://test.com./test1",
          });
          cy.createBlog({
            author: "Shave",
            title: "Blog2",
            url: "http://test.com./test2",
          });
          cy.createBlog({
            author: "Shake",
            title: "Blog3",
            url: "http://test.com./test3",
          });
          cy.contains("Blog1 Shane").parent().as("blog1");
          cy.contains("Blog2 Shave").parent().as("blog2");
          cy.contains("Blog3 Shake").parent().as("blog3");
        });

        it("blogs are ordered according to likes in descending order", function () {
          cy.get("@blog1").contains("view").click();
          cy.get("@blog1").contains("like").click();
          cy.wait(500);
          cy.get("@blog1").contains("like").click();
          cy.wait(500);
          cy.get("@blog1").contains("hide").click();

          cy.get("@blog2").contains("view").click();
          cy.get("@blog2").contains("like").click();
          cy.wait(500);

          cy.get("@blog2").contains("like").click();
          cy.wait(500);
          cy.get("@blog2").contains("like").click();
          cy.wait(500);

          cy.get("@blog2").contains("like").click();
          cy.wait(500);
          cy.get("@blog2").contains("hide").click();

          cy.get("@blog3").contains("view").click();
          cy.get("@blog3").contains("like").click();
          cy.wait(500);

          cy.get("@blog3").contains("like").click();
          cy.wait(500);
          cy.get("@blog3").contains("like").click();
          cy.wait(500);
          cy.get("@blog3").contains("hide").click();

          cy.get(".blog-list").eq(0).should("contain", "Blog2 Shave");
          cy.get(".blog-list").eq(1).should("contain", "Blog3 Shake");
          cy.get(".blog-list").eq(2).should("contain", "Blog1 Shane");
        });
      });
    });
  });
});
