package com.myblog;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.synycs.truckbay.server.BlogPost;
import com.synycs.truckbay.server.services.AdminService;

@Path("/blogPost")
public class BlogPostService {
	private static Logger logger= LoggerFactory.getLogger(BlogPostService.class);
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BlogPost>  getAllblogPosts(){
		List<BlogPost> blogPosts = null;
       
		try{
			blogPosts = AdminService.getInstance().getAllBlogPosts();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return blogPosts;
    }

	
	@GET
	@Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public BlogPost  getblogPostById(@PathParam("id") String id){
		BlogPost blogPost = null;
       
		try{
			blogPost = AdminService.getInstance().getBlogPostById(id);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return blogPost;
    }
	
	
	@POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public MyResponse setUser(BlogPost blogPost){
		MyResponse myResponse = new MyResponse();
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Calcutta"));
        DateTime dt = new DateTime(cal.getTime());
        DateTimeZone dtZone = DateTimeZone.forID("Asia/Calcutta");
        DateTime dtus = dt.withZone(dtZone);
        Date dateInIndia = dtus.toLocalDateTime().toDate();
        AdminService adminService= AdminService.getInstance();
        try {
            blogPost.setTime(dateInIndia);
            adminService.addBlogPost(blogPost);
            myResponse.setResponse("false");
        }
        catch (Exception e){
            e.printStackTrace();
            myResponse.setResponse("true");
        }
        return myResponse;

    }
	

}
