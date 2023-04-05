using Microsoft.EntityFrameworkCore;

namespace TaskListChallengeTardigrade.Models
{
    public class TaskDataAccessLayer
    {
        MasterContext db = new MasterContext();

        public IEnumerable<Task> GetAllTasks()
        {
            try
            {
                return db.Tasks.ToList();
            }
            catch
            {
                throw;
            }
        }
    
        public int AddTask(Task task)
        {
            try
            {
                db.Tasks.Add(task);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    
        public int UpdateTask(Task task)
        {
            try
            {
                db.Entry(task).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }
  
        public Task GetTaskData(string name)
        {
            try
            {
                Task task = db.Tasks.Find(name);
                return task;
            }
            catch
            {
                throw;
            }
        }
  
        public int DeleteTask(string name)
        {
            try
            {
                Task task = db.Tasks.Find(name);
                db.Tasks.Remove(task);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
