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
	
	private NumericKeyboardFactory()
	{
		numericKeyboards = new ArrayList<>();
		String[] ask = new String[4];
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
	public static MessageToSend getStandardBrowseMessage(long chat_id, List<ItemMag> magazzino, int begin, int end)
	{

		if(end > magazzino.size())
			end = magazzino.size();
		if(begin < 0)
			begin = 0;
		int len = Math.min(end - begin, 4);
		String [] ask = new String[len];
		int c = 0;
		for(int i = begin; i < end && c < 4; i++)
		{
			ask[c] = magazzino.get(i).getNome() + " " + Italiano.QUANTITA + magazzino.get(i).getQuantita() +" "+ Italiano.ALCOSTO + magazzino.get(i).getCosto();
			c++;
		}
		
		return getStandardBrowseMessage( chat_id, ask);
	}
	
	public static MessageToSend getStandardBrowseMessage(long chat_id, String... strs)
	{
		MessageToSend mts;
		
		if(strs.length == 0)
			return new MessageToSend(chat_id, " ");
		int len = Math.min(4, strs.length);
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
