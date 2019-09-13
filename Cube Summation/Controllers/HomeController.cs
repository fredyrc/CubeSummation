using Cube_Summation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cube_Summation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "MI CONTACTO";
            return View();
        }

        public ActionResult CeateCube(int length, int position)
        {
            if (CurrentCube.ListCube.ContainsKey(position))
                CurrentCube.ListCube.Remove(position);

            CurrentCube.ListCube.Add(position,new ModelCube(length));
            return Json(new
            {
                EsCreate = true
            });
        }

        public ActionResult ActionUpdate(ModelUpdate inputData, int position)
        {
            CurrentCube.ListCube[position].UpdateCube(inputData);
            return Json(new
            {
                esUpdate = true
            });
        }

        public ActionResult ActionQuery(ModelQuery query, int position)
        {
           var result= CurrentCube.ListCube[position].QueryCube(query);
            return Json(new
            {
                esQuery = true,
                result
            });
        }
    }


  }