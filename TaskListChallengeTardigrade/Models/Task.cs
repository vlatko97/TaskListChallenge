using System;
using System.Collections.Generic;

namespace TaskListChallengeTardigrade.Models;

public partial class Task
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime DueDate { get; set; }

    public string Status { get; set; } = null!;
}
