using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Cube_Summation;
using Cube_Summation.Controllers;
using Cube_Summation.Models;

namespace Cube_Summation.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void IndexNotNull()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

      
        [TestMethod]
        public void ContactNotNull()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ActionQueryNotNull()
        {
            // Arrange
            HomeController controller = new HomeController();
            ModelQuery modelQuery = new ModelQuery();

            // Act
            ActionResult result = controller.ActionQuery(modelQuery,0) as ActionResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void CreateCubeNotNull()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ActionResult result = controller.CreateCube(1,0) as ActionResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ActionUpdateNotNull()
        {
            // Arrange
            HomeController controller = new HomeController();
            ModelUpdate update = new ModelUpdate();

            // Act
            ActionResult result = controller.ActionUpdate(update,0) as ActionResult;

            // Assert
            Assert.IsNotNull(result);
        }


    }
}
