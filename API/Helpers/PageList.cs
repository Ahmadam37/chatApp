using Microsoft.EntityFrameworkCore;

namespace API.Helper;

public class PageList<T> : List<T>
{
    public PageList(IEnumerable<T> items, int count , int pageNumber, int pageSize)
    {
        CurrntPage = pageNumber;
        TotalPages = (int) Math.Ceiling(count / (double)pageSize);
        PageSize = pageSize;
        TotalCount = count;
        AddRange(items);
    }

    public int CurrntPage { get; set;}
    public int TotalPages { get; set;}
    public int PageSize { get; set;}
    public int TotalCount { get; set;}
    public int CurrentPage { get; internal set; }

    public static async Task<PageList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PageList<T>(items, count, pageNumber, pageSize);
    }
}
