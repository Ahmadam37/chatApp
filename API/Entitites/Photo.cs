namespace API.Entitites;

public class Photo
{

    public int Id { get; set; }

    public required string Url { get; set; }

    public bool isMan { get; set; }

    public string? PublicId { get; set; }

}