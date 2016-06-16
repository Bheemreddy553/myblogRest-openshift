package com.myblog;

import com.synycs.truckbay.server.BlogPostDetails;
import com.synycs.truckbay.server.services.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Bhargav on 15-06-2016.
 */
@Path("/blogPostDetails")
public class BlogPostDetailesService {
    private static Logger logger= LoggerFactory.getLogger(BlogPostDetailesService.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BlogPostDetails> getAllblogPosts(){
        List<BlogPostDetails> blogPostDetailses = null;

        try{
            blogPostDetailses = AdminService.getInstance().getAllBlogPostDetails();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return blogPostDetailses;
    }


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public BlogPostDetails  getblogPostById(@PathParam("id") String id){
        BlogPostDetails blogPostDetails = null;

        try{
            blogPostDetails = AdminService.getInstance().getBlogPostDetailsById(id);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return blogPostDetails;
    }
}
