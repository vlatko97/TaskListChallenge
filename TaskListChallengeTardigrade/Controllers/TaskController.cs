using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using TaskListChallengeTardigrade.Models;

namespace TaskListChallengeTardigrade.Controllers
{
    public class TaskController : Controller
    {
        TaskDataAccessLayer objtask = new TaskDataAccessLayer();

        [HttpGet]
        [Route("api/Task/Index")]
        public IEnumerable<TaskListChallengeTardigrade.Models.Task> Index()
        {
            return objtask.GetAllTasks();
        }

        [HttpPost]
        [Route("api/Task/Create")]
        public int Create(TaskListChallengeTardigrade.Models.Task task)
        {
            return objtask.AddTask(task);
        }

        [HttpGet]
        [Route("api/Task/Details/{name}")]
        public TaskListChallengeTardigrade.Models.Task Details(string name)
        {
            return objtask.GetTaskData(HttpUtility.UrlDecode(name));
        }

        [HttpPut]
        [Route("api/Task/Edit")]
        public int Edit(TaskListChallengeTardigrade.Models.Task task)
        {
            return objtask.UpdateTask(task);
        }

        [HttpDelete]
        [Route("api/Task/Delete/{name}")]
        public int Delete(string name)
        {
            return objtask.DeleteTask(HttpUtility.UrlDecode(name));
        }
    }
}