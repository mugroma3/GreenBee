package apinod;

import java.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ChiamatoreAPI {

	private OkHttpClient client;
	public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
	public static final MediaType TEXT = MediaType.parse("text/html; charset=UTF-8");

	
	
	public ChiamatoreAPI() {
		client = new OkHttpClient();
	}

	public String getAlServer(String url) {
		Request request = new Request.Builder().url(url).build();
		try (Response response = client.newCall(request).execute()) {
			return response.body().string();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return "";
	}

	public String putAlServer(String url, String json) {
		RequestBody body = RequestBody.create(JSON, json);
		Request request = new Request.Builder().url(url).put(body).build();
		try (Response response = client.newCall(request).execute()) {
			return response.body().string();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return "";
	}
	
	public String postAlServer(String url, String json) {
		RequestBody body = RequestBody.create(JSON, json);
		Request request = new Request.Builder().url(url).post(body).build();
		try (Response response = client.newCall(request).execute()) {
			return response.body().string();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return "";
	}
	
	public String putAlServer(String url) {
		return putAlServer(url, "");
	}

}
