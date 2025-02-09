export interface Analysis {
	valid: Valid;
	statement: BankStatement;
}

export interface Valid {
	status: boolean;
	error: string;
}

export interface Transaction {
	date: Date;
	description: string;
	amount: number;
	balance: number;
}

export interface LoanPayment {
	lender: string;
	emiAmount: number;
	lastPaidDate: Date;
	frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Half-yearly' | 'Yearly';
	totalPaid: number;
}

export interface BillInsight {
	type:
		| 'Electricity'
		| 'Water'
		| 'Gas'
		| 'Internet'
		| 'Phone'
		| 'Credit Card'
		| 'Rent'
		| 'Employee Salary'
		| 'Subscription'
		| 'Other';
	frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Half-yearly' | 'Yearly';
	averageAmount: number;
	provider: string;
	description: string;
	totalAmount: number;
}

export interface BankStatement {
	accountDetails: {
		customerName: string;
		accountNumber: string;
		period: {
			from: Date;
			to: Date;
		};
		openingDate: Date;
		currency: string;
	};
	summary: {
		evaluation: number;
		overview: string;
		openingBalance: number;
		closingBalance: number;
		deposits: number;
		withdrawals: number;
	};
	outstandingLoans: {
		loanPayments: LoanPayment[];
		totalEmi: number;
	};
	billInsights: BillInsight[];
	transactions: Transaction[];
}

export interface Question {
	question_cid: string;
	question_text: string;
}
