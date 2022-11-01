<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Feedback;
use App\Models\Gender;
use App\Models\Order;
use App\Models\Preference;
use App\Models\Product;
use App\Models\Statistic;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statistics = Statistic::orderBy('id', 'desc')->limit(12)->get();

        $totalCustomers = Customer::count();
        $totalOrders = Order::count();
        $totalCanceledOrders = Order::where('status_id', 2)->count();
        $totalFeedbacks = Feedback::count();

        $limitNumber = 8;

        $mostSelledProducts = Product::orderBy('total_sales', 'desc')->limit($limitNumber)->get();
        $customerLeaderboard = Customer::orderBy('total_purchases', 'desc')->limit($limitNumber)->get();
    
        $genders = Gender::all();
        $totalGender = [];

        foreach ($genders as $gender) {
            $totalGender[$gender->guard_name] = Customer::where('gender_id', $gender->id)->count();
        }

        $customerStatus = ['inactive', 'active'];

        $totalCustomerStatus = [];

        foreach ($customerStatus as $key => $status) {
            $totalCustomerStatus[$status] = Customer::where('live_mode', $key)->count();
        }

        $feedbackSorting = ['negative', 'positive'];

        $totalFeedbackRating = [];

        foreach ($feedbackSorting as $key => $sorting) {
            $totalFeedbackRating[$sorting] = Feedback::where('sorting', $key)->count();
        }

        $lastFeedbacks = Feedback::orderBy('id', 'desc')->limit(5)->get();

        $totalProfitAmount = Preference::sum('payment_amount');
        $totalProfitAmount = round($totalProfitAmount, 2);

        $totalRefundAmount = Preference::sum('refund_amount');
        $totalRefundAmount = round($totalRefundAmount, 2);

        $totalIncomeAmount = $totalProfitAmount - $totalRefundAmount;
        $totalIncomeAmount = round($totalIncomeAmount, 2);

        return response()->json([
            'data' => [
                'statistics' => $statistics,
                'total' => [
                    'customers' => $totalCustomers,
                    'orders' => $totalOrders,
                    'canceled_orders' => $totalCanceledOrders,
                    'feedbacks' => $totalFeedbacks,
                ],
                'genders' => $totalGender,
                'customer_status' => $totalCustomerStatus,
                'feedback_rating' => $totalFeedbackRating,
                'wallet' => [
                    'profit_amount' => $totalProfitAmount,
                    'refund_amount' => $totalRefundAmount,
                    'income_amount' => $totalIncomeAmount
                ],
                'leaderboards' => [
                    'customers' => $customerLeaderboard,
                    'products' => $mostSelledProducts
                ],
                'last_feedbacks' => $lastFeedbacks
            ]
        ]);
    }
}
