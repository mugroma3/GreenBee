package bot;

import java.util.ArrayList;
import java.util.List;

import com.botticelli.bot.request.methods.MessageToSend;
import com.botticelli.bot.request.methods.types.KeyboardButton;
import com.botticelli.bot.request.methods.types.ReplyKeyboardMarkupWithButtons;

import gestionelingue.Italiano;
import oggettijson.ItemMag;

public class NumericKeyboardFactory {
	
	private static List<ReplyKeyboardMarkupWithButtons> numericKeyboards;
	private static NumericKeyboardFactory mySelf; 
	public static final int PAGESIZE = 4;
	private NumericKeyboardFactory()
	{
		numericKeyboards = new ArrayList<>();
		String[] ask = new String[PAGESIZE];
		ask[0] = " ";
		ask[1] = " ";
		ask[2] = " ";
		ask[3] = " ";
		for(int i = 0; i < ask.length ;i++)
		{
			ReplyKeyboardMarkupWithButtons keyboard = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			keyboard.addLine(OrtoBioBot.LEFT, OrtoBioBot.RIGHT, OrtoBioBot.REFRESH, OrtoBioBot.BACK);
			ask[i] = String.valueOf(i+1);
			keyboard.addLine(ask);
			keyboard.setResizeKeyboard(true);
			numericKeyboards.add(keyboard);
		}
	}

	
	public static NumericKeyboardFactory getIstance()
	{
		if(mySelf == null)
			mySelf = new NumericKeyboardFactory();
		return mySelf;
	}
	
	/*
	 * end è escluso!
	 */
	public static MessageToSend getStandardBrowseMessage(long chat_id, StatoUtente stato)
	{
		return getStandardBrowseMessage( chat_id, stato.buildItemMagStringArray());
	}
	
	public static MessageToSend getStandardBrowseMessage(long chat_id, String... strs)
	{
		MessageToSend mts;
		
		if(strs.length == 0)
			return new MessageToSend(chat_id, " ");
		int len = Math.min(PAGESIZE, strs.length);
		String text = "";
		for(int i = 0; i < len; i++)
		{
			text += "/" + (i+1) +" "+ strs[i] +"\n";
		}
		mts = new MessageToSend(chat_id, text);
		mts.setReplyMarkup(numericKeyboards.get(len - 1));
		return mts;
	}
	
}
