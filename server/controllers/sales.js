import PostMessage from "../models/postMessage.js";

export const getSales = async (req, res) => {
  try {
    const transactions = await PostMessage.find().sort({ createdAt: -1 });
    const LoanAmountByLoanGradeAndLoanPurpose = await PostMessage.aggregate([
      { $group: 
        {
          _id: {
            grade:'$loanGrade',
            purpose:'$loanPurpose'
          }, 
          totalLoanAmount: { $sum: { $toDouble:'$loanAmount'} } } },
      {$group: 
        {_id:"$_id.grade",
        totals:{
          $push:
          {
            purpose:'$_id.purpose',
            total:'$totalLoanAmount'
          }
        }
      }
    }
    ]);
    
    var graphData = [];

    for(let i=0; i<LoanAmountByLoanGradeAndLoanPurpose.length;i++){
      var element = {"grade":LoanAmountByLoanGradeAndLoanPurpose[i]._id}
      for(let j=0; j<LoanAmountByLoanGradeAndLoanPurpose[i].totals.length;j++){
        var key = LoanAmountByLoanGradeAndLoanPurpose[i].totals[j].purpose.replace(/\s+/g, '')
        element[key]=LoanAmountByLoanGradeAndLoanPurpose[i].totals[j].total;
      }
      graphData[i]=element;
    }
    for(let k=0; k<graphData.length;k++){
      graphData[k]["MajorPurchaseColor"] = "hsl(265, 70%, 50%)";
      graphData[k]["BusinessColor"] = "hsl(131, 70%, 50%)";
      graphData[k]["DebtConsolidationColor"] = "hsl(300, 70%, 50%)";
      graphData[k]["CreditCardColor"] = "hsl(149, 70%, 50%)";
      graphData[k]["EducationColor"] = "hsl(29, 70%, 50%)";
      if(!graphData[k]["MajorPurchase"]){
        graphData[k]["MajorPurchase"] =0;
      }
      if(!graphData[k]["Business"]){
        graphData[k]["Business"]=0;
      }
      if(!graphData[k]["DebtConsolidation"]){
        graphData[k]["DebtConsolidation"]=0;
      }
      if(!graphData[k]["CreditCard"]){
        graphData[k]["CreditCard"]=0;
      }
      if(!graphData[k]["Education"]){
        graphData[k]["Education"]=0;
      }
    }
    console.log("graphData",graphData);
    
    res.status(200).json({graphData});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};