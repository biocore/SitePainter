import java.io.*;
import java.awt.*;
import java.awt.event.*;
import java.applet.*;
import javax.swing.*;
import javax.swing.border.*;
import java.net.*;

public class filer extends JApplet implements ActionListener { private JPanel panel = null;
  private JLabel selectedFile = null;
  private final String BROWSE = "browse";
  private String path = System.getProperty("user.home");
  public  String text = "";

  public void init() {
    try {
      filerInit();
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  public void readFile(String fn) {
    String thisLine;
    text = "";
    try {
      FileInputStream fin =  new FileInputStream(fn);
      BufferedReader myInput = new BufferedReader
                         (new InputStreamReader(fin));
      while ((thisLine = myInput.readLine()) != null) {  
        text += thisLine + "\n";
      }
      getAppletContext().showDocument
        (new URL("javascript:ProcessFile()"));

    } catch (Exception e) {
      text = "Cannot load, exception!";
    }
  }

  private void filerInit() throws Exception {
    panel = new JPanel();
    panel.setLayout(new GridLayout(2, 1, 5, 5));
    panel.setBorder(BorderFactory.createEtchedBorder(EtchedBorder.LOWERED));
    
    selectedFile = new JLabel("No file selected.");
    panel.add(selectedFile);
    
    JButton browseButton = new JButton("Browse");
    browseButton.setActionCommand(BROWSE);
    browseButton.addActionListener(this);
    panel.add(browseButton);
    
    setContentPane(panel);
  }

  public void actionPerformed(ActionEvent e) {
    if (e.getActionCommand().equals(BROWSE)) {
       JFileChooser fileChooser = new JFileChooser(path);
       
	   fileChooser.setMultiSelectionEnabled(false);
       
       int option = fileChooser.showOpenDialog(panel);
       if (option == JFileChooser.APPROVE_OPTION) {
          File theFile = fileChooser.getSelectedFile();
          
          // Reading File and setting path
          readFile(theFile.getAbsolutePath());
          selectedFile.setText(theFile.getName());
          path = theFile.getParent();
        } else {
          selectedFile.setText("No file selected.");
        }
    }
  }
}

