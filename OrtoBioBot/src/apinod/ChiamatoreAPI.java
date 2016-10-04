package apinod;

import java.io.IOException;
import java.lang.reflect.Type;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ChiamatoreAPI {

	
	private OkHttpClient client;
	private APINod urlContainer;
	
	//rifare con quelli che saranno
	private Type intResult;
	private Type chatResult;
	private Type booleanResult;
	private Type messageResult;
	private Type userProfilePhotosResult;
	private Type downlodableFileResult;
	private Type listUpdateResult;
	private Type listChatMembersResult;
	private Type chatMembersResult;
	
	
	public ChiamatoreAPI() 
	{
		 client = new OkHttpClient();
		 urlContainer = new APINod();
	}
	
	
	
	public boolean isNellOrto(long id)
	{
		Request request = new Request.Builder()
			      .url(urlContainer.getIsNellOrto() + String.valueOf(id))
			      .build();

			  Response response;
			try {
				response = client.newCall(request).execute();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				return false;
			}
			  try {
				return Boolean.valueOf(response.body().string());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			  return false;
	}
}
