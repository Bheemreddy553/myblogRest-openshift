package com.myblog;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.synycs.truckbay.server.BlogImage;
import com.synycs.truckbay.server.BlogPost;
import com.synycs.truckbay.server.services.AdminService;

@Path("/blogImage")
public class BlogImageService {
private static Logger logger= LoggerFactory.getLogger(BlogImageService.class);
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<BlogImage>  getAllBlogImages(){
		List<BlogImage> blogImages = null;
       
		try{
			blogImages = AdminService.getInstance().getAllBlogImages();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return blogImages;
    }

	
	@GET
	@Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public BlogImage  getblogPostById(@PathParam("id") String id){
		BlogImage blogImage = null;
       
		try{
			blogImage = AdminService.getInstance().getBlogImageById(id);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return blogImage;
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
	
	@POST
	@Path("/pdf")
	@Consumes({MediaType.MULTIPART_FORM_DATA})
	public Response uploadPdfFile(@FormDataParam("file") InputStream fileInputStream,
	                                @FormDataParam("file") FormDataContentDisposition fileMetaData,@FormDataParam("country") String country,@FormDataParam("location") String loc) throws Exception
	{
	    String UPLOAD_PATH = "/home/varshini/Documents/travel_blog/intellij/myblog-webapp/src/main/webapp/";

		Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Calcutta"));
		DateTime dt = new DateTime(cal.getTime());
		DateTimeZone dtZone = DateTimeZone.forID("Asia/Calcutta");
		DateTime dtus = dt.withZone(dtZone);
		Date dateInIndia = dtus.toLocalDateTime().toDate();

	    try
	    {
			logger.info("location {}",loc);


	        int read = 0;
	        byte[] bytes = new byte[1024];
	 
	        OutputStream out = new FileOutputStream(new File(UPLOAD_PATH + fileMetaData.getFileName()));
	        while ((read = fileInputStream.read(bytes)) != -1) 
	        {
	            out.write(bytes, 0, read);
	        }
			logger.info("file uploaded at {}",UPLOAD_PATH);
			BlogPost blogPost = new BlogPost();
			blogPost.setId("1");
			BlogImage blogImage  =new BlogImage();
			blogImage.setCountry(country);
			blogImage.setLocation(loc);
			blogImage.setUrl(UPLOAD_PATH);
			blogImage.setTitle("myimage");
			blogImage.setDate(dateInIndia);
blogImage.setBlogPost(blogPost);
			AdminService.getInstance().addBlogImage(blogImage);
	        out.flush();
	        out.close();
	    } catch (IOException e) {
			e.printStackTrace();
		}
		return Response.ok("Data uploaded successfully !!").build();
	}

}
